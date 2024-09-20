import { ComponentFixture, DeferBlockState } from "@angular/core/testing";

export async function loadDefer<T>(fixture: ComponentFixture<T>): Promise<void> {
  return new Promise(async (res, _) => {
    const deferBlockFixture = (await fixture.getDeferBlocks())[0];
    res(deferBlockFixture.render(DeferBlockState.Complete));
  });
}