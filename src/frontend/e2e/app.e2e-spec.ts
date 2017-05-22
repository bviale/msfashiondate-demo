import { MsfashiondatePage } from './app.po';

describe('msfashiondate App', () => {
  let page: MsfashiondatePage;

  beforeEach(() => {
    page = new MsfashiondatePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
