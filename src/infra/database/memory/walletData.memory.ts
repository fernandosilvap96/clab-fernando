import { IWalletData } from '../../../domain/data/walletData';

export class WalletDataMemory implements IWalletData {
    walletData: any[];

    constructor() {
        this.walletData = [
            {
                privateKey:
                    '399fea8829facbbf5c5790eede186bba07c0a24d2e68324046b5d8b3bf035c5b',
                publicAddress: '0x8d19f8c1d828548A739Ff9B81b30eF17Ae66EC0f',
            },
        ];
    }

    async getWallet(): Promise<any> {
        const walletValid = this.walletData[0];

        return walletValid;
    }
}
