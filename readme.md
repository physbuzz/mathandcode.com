# mathandcode-native example

This site exercises md2html site layouts, includes, posts, dated permalinks,
math, executable-source presentation, static assets, archives, and feeds.

Build it from `test_websites`:

```bash
make mathandcode-native
```

The templates keep site design and generated content separate. `css/main.css`
defines the site shell and ordinary HTML. `css/md2html.css` styles md2html's
`codehilite`, `code-box`, `code-output`, and table-of-contents structures. The
head then emits the `{{ md2html.css }}` Liquid value for the selected syntax
palette, followed by generated math styles and authored stylesheets. Change
`highlighter`, `highlighter_style`, or `highlighter_dark_style` in
`md2html.json` instead of writing token colors by hand. This example selects
Pygments with its default light and dark palettes, including Wolfram-specific colors.

Every document layout includes `head.html`, directly or through
`default.html`. Keep `md2html.font_preloads`, `md2html.page_stylesheets`,
`md2html.css`, the math asset variables, and `md2html.mathjax_config` in their
existing order. The conditional `math-copy.html` include belongs at the end of
any layout that does not use the shared footer.
