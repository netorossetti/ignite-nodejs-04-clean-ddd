import { WatchedList } from "./watched-list";

class NumberWacthedLists extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b;
  }
}

describe("watched list", () => {
  it("deve ser possivel criar uma watched list com valores iniciais: ", () => {
    const list = new NumberWacthedLists([1, 2, 3]);
    list.update([1, 7, 8, 9]);

    console.log("initial", list.currentItems);
    console.log("new", list.getNewItems());
    console.log("removed", list.getRemovedItems());

    expect(list.currentItems).toEqual(list.getItems());
  });
});
