import { render, screen } from "../../../test-utils/testing-library-utils";

import Options from "../Options";

//optionType="scoops"
test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  //이미지 찾기
  //MEMO 서버(mock service worker)에서 axios 비동기로 데이터 가져오는거라 findAllByRole 써야함
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i }); //alt 값이 대소문자 상관없는 scoop으로 끝나는 문자열
  expect(scoopImages).toHaveLength(2);

  //confirm alt text of images
  const altText = scoopImages.map((scoop) => scoop.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

//optionType="toppings"
test("displays image for each toppings option from server", async () => {
  render(<Options optionType="toppings" />);

  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  const imageTitle = toppingImages.map((img) => img.alt);
  expect(imageTitle).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
