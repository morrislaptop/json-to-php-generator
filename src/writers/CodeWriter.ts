import {PhpVisibility} from '@/enums/PhpVisibility';

const INDENT = '\t';
const NEW_LINE = '\n';

export default class CodeWriter {
    private content = '';
    private indentation = '';

    public openClass(name: string, options?: { namespace?: string; isFinal?: boolean; isReadonly?: boolean }): void {
        this.writeLine(`<?php`);
        this.writeLine(``);
        this.writeLine(`declare(strict_types=1);`);
        this.writeLine(``);
        this.writeLine(options?.namespace ? `namespace ${options?.namespace};` : '');
        this.writeLine(``);
        this.writeLine(`// Generated via https://morrislaptop.github.io/json-to-php-generator`);
        this.writeLine(``);
        this.writeLine(`${(options?.isFinal ? 'final ' : '')}${(options?.isReadonly ? 'readonly ' : '')}class ${name} extends \\Spatie\\LaravelData\\Data `);
        this.writeLine('{');
        this.indent();
    }

    public closeClass(): void {
        this.outdent();
        this.writeLine('}');
    }

    public writeInlineDocblock(line: string): void {
        this.writeLine(`/** ${line} */`);
    }

    public writeMultilineDocblock(lines: string[]): void {
        this.writeLine('/**');
        lines.forEach((line) => this.writeLine(' * ' + line));
        this.writeLine(' */');
    }

    public openMethod(
        visibility: PhpVisibility,
        name: string,
        returnType: string | null,
        parameters: string[],
        options?: { isStatic?: boolean, isMultiline?: boolean}
    ): void {
        let method = `${visibility}${options?.isStatic ? ' static': ''} function ${name}(`;
        const methodClose = ')' + (returnType ? ': ' + returnType : '');

        if (options?.isMultiline && parameters.length > 0) {
            this.writeLine(method);
            this.indent();

            for (let i = 0; i < parameters.length; i++) {
                this.writeLine(parameters[i] + (i < parameters.length - 1 ? ',' : ''));
            }

            this.outdent();
            this.writeLine(`${methodClose} {`)
            this.indent();

            return;
        }

        method += parameters.join(', ') + methodClose;
        this.writeLine(method);
        this.writeLine('{');

        this.indent();
    }

    public closeMethod(): void {
        this.outdent();
        this.writeLine('}');
    }

    public insertNewLine(): void {
        this.content += NEW_LINE;
    }

    public writeLine(line: string): void {
        this.content += this.indentation + line + NEW_LINE;
    }

    public writeLines(lines: string[]): void {
        lines.forEach((line) => this.writeLine(line));
    }

    public indent(): void {
        this.indentation += INDENT;
    }

    public outdent(): void {
        this.indentation = this.indentation.substr(0, this.indentation.length - INDENT.length);
    }

    public getContent(): string {
        return this.content;
    }
}
