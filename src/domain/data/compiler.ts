export interface ICompiler {
    compile(contract: any): CompilationResult;
}

export type CompilationResult = {
    abi: any;
    bytecode: any;
};
