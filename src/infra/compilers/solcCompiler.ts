import compile from '../../chain/actions/compile.js';
import { ICompiler } from '../../domain/data/compiler';

export class SolcCompiler implements ICompiler {
    compile(contractName: string): { abi: any; bytecode: string } {
        const compilationResult = compile(contractName);

        return compilationResult;
    }
}
