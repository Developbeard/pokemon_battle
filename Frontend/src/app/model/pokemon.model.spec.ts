import { Pokemon } from "./model/Pokemon";

describe('Pokemon', () => {
  it('should create an instance', () => {
    expect(new Pokemon()).toBeTruthy();
  });
});
