const path = require('path')
const fs = require('fs')

module.exports = (solidtyFileNameWithExtension) => ({
    language: 'Solidity',
    sources: {
        [solidtyFileNameWithExtension]: {
            content: fs.readFileSync(path.resolve('src/chain/contracts', solidtyFileNameWithExtension), 'utf8')
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
})