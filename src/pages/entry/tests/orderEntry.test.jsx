import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import { userEvent } from "@testing-library/user-event";

test("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
      return res(ctx.status(500));
    }),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test("스쿱 주문이 없을 경우 버튼 비활성화", async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  //옵션이 로드되기 전 처음에는 주문 버튼을 비활성화
  let orderButton = screen.getByRole("button", { name: /Order Sundae/i });
  expect(orderButton).toBeDisabled();

  //옵션을 추가한 후 주문 버튼이 활성화될 것으로 예상
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /Vanilla/i,
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(orderButton).toBeEnabled();

  //스쿱을 제거한 후 주문 버튼이 다시 비활성화
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "0");
  expect(orderButton).toBeDisabled();
});
