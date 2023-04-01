import { z } from 'zod';
import { createProtectedRouter } from './context';

export const protectedInvoiceActions = createProtectedRouter()
  .mutation('addInvoice', {
    input: z.object({
      clientName: z.string(),
      status: z.string(),
      amountDue: z.number(),
      paymentDue: z.date(),
      invoiceDate: z.date(),
      description: z.string(),
      streetName: z.string(),
      city: z.string(),
      postCode: z.string(),
      country: z.string(),
      clientStreetName: z.string(),
      clientCity: z.string(),
      clientPostCode: z.string(),
      clientCountry: z.string(),
      clientEmail: z.string(),
      items: z
        .object({
          itemName: z.string(),
          quantity: z.number().int().nullish(),
          price: z.number().nullish(),
        })
        .array(),
    }),
    async resolve({ ctx, input }) {
      const { items: inputItems, ...invoiceData } = input;
      const invoice = await ctx.prisma.invoice.create({ data: { ...invoiceData, userId: ctx.session.user.id } });
      const items = await ctx.prisma.invoiceItem.createMany({
        data: inputItems.map((item) => ({ invoiceId: invoice.id, ...item })),
      });
      return { ...invoice, items };
    },
  })
  .mutation('editInvoice', {
    input: z.object({
      invoiceId: z.string(),
      clientName: z.string(),
      status: z.string(),
      amountDue: z.number(),
      paymentDue: z.date(),
      invoiceDate: z.date(),
      description: z.string(),
      streetName: z.string(),
      city: z.string(),
      postCode: z.string(),
      country: z.string(),
      clientStreetName: z.string(),
      clientCity: z.string(),
      clientPostCode: z.string(),
      clientCountry: z.string(),
      clientEmail: z.string(),
      items: z
        .object({
          itemName: z.string(),
          quantity: z.number().int().nullish(),
          price: z.number().nullish(),
        })
        .array(),
    }),
    async resolve({ ctx, input }) {
      const { items: inputItems, ...invoiceData } = input;
      const invoice = await ctx.prisma.invoice.update({
        where: { id: invoiceData.invoiceId },
        data: {
          ...invoiceData,
          userId: ctx.session.user.id,
          invoiceItem: { deleteMany: { invoiceId: invoiceData.invoiceId }, createMany: { data: inputItems } },
        },
      });

      console.log(invoice);

      return { ...invoice };
    },
  })
  .query('fetchUserInvoices', {
    async resolve({ ctx }) {
      const invoice = await ctx.prisma.invoice.findMany({ where: { userId: { equals: ctx.session.user.id } } });
      return invoice;
    },
  })
  .query('fetchInvoice', {
    input: z.string(),
    async resolve({ ctx, input }) {
      const invoiceId = input;
      const invoice = await ctx.prisma.invoice.findFirst({ where: { id: { equals: invoiceId } } });
      const items = await ctx.prisma.invoiceItem.findMany({ where: { invoiceId } });
      if (!invoice) return undefined;

      return { ...invoice, items };
    },
  })
  .mutation('delete', {
    input: z.string(),
    async resolve({ ctx, input }) {
      const invoiceId = input;
      await ctx.prisma.invoice.delete({ where: { id: invoiceId } });

      return null;
    },
  })
  .mutation('markAsPaid', {
    input: z.string(),
    async resolve({ ctx, input }) {
      const invoiceId = input;
      const invoice = await ctx.prisma.invoice.update({ where: { id: invoiceId }, data: { status: 'paid' } });
      const items = await ctx.prisma.invoiceItem.findMany({ where: { invoiceId } });

      return { ...invoice, items };
    },
  });
