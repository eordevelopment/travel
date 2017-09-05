import { KitchenHelperPage } from './app.po';

describe('kitchen-helper App', () => {
  let page: KitchenHelperPage;

  beforeEach(() => {
    page = new KitchenHelperPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
