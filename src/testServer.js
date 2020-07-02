import { rest, context } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get(`https://data.ct.gov/resource/y6p2-px98.json?category=Fruit&item=Peaches`, (req, res, context) => {
    return res(
      context.status(200),
      context.json([
        { category: 'Fruit', item: 'Peaches', location_1: { type: 'Point', coordinates: [-79.402352, 45.649393] } }
      ])
    )
  }),

  rest.get('*', (req, res, context) => {
    return res(
      context.status(500),
      context.json({ success: false, msg: `Please add a request handler for ${req.url.toString()}` })
    )
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
beforeAll(() => server.resetHandlers());

export { server, rest };