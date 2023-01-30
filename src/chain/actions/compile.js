const solc = require('solc')
const fs = require('fs')
const path = require('path')
const input = require('./input')

const findImports = (importFile) => {
    try {
        return { contents: fs.readFileSync(path.resolve('src/chain/contracts', importFile), 'utf8') }
    } catch (error) {
        try {
            return { contents: fs.readFileSync(path.resolve('node_modules', importFile), 'utf8') }
        } catch (error) {
            throw error
        }
    }
}

module.exports = (solidtyFileNameWithoutExtension) => {
    const inputResult = input(`${solidtyFileNameWithoutExtension}.sol`)
    const output = JSON.parse(solc.compile(JSON.stringify(inputResult), { import: findImports }))

    return {
        abi: output.contracts[`${solidtyFileNameWithoutExtension}.sol`][solidtyFileNameWithoutExtension].abi,
        bytecode: output.contracts[`${solidtyFileNameWithoutExtension}.sol`][solidtyFileNameWithoutExtension].evm.bytecode.object
    }
}