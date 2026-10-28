MD2HTML ?= $(if $(wildcard ../md2html/.venv/bin/md2html),$(abspath ../md2html/.venv/bin/md2html),md2html)
SICP ?= ../sicp
METAMATH ?= ../metamath

.PHONY: all build books serve

all: build

build:
	$(MD2HTML) --no-execute

books:
	$(MAKE) -C "$(SICP)" markdown MD2HTML="$(MD2HTML)" MARKDOWN_OUTPUT="$(CURDIR)/books/sicp"
	$(MAKE) -C "$(METAMATH)" markdown MD2HTML="$(MD2HTML)" MARKDOWN_OUTPUT="$(CURDIR)/books/metamath"

serve:
	$(MD2HTML) --serve --host 0.0.0.0 --port 8000
