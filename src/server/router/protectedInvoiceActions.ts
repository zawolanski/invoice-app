import { z } from 'zod';
import { createProtectedRouter } from './context';

export const protectedInvoiceActions = createProtectedRouter().mutation('addInvoice', {
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
});
