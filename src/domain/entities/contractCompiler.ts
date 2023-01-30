import { ICompiler, CompilationResult } from '../data/compiler';

export class ContractCompiler implements ICompiler {
    private compiler: ICompiler;

    constructor(compiler: ICompiler) {
        this.compiler = compiler;
    }

    compile(contract: any): CompilationResult {
        return this.compiler.compile(contract);
    }
}
