import PhpType from '@/php-types/PhpType';

export default class IntType extends PhpType {
    public getType(): string {
        return 'float'; // safer?
    }

    public getDocblockContent(): string {
        return 'float'; // safer?
    }

    public isDocblockRequired(): boolean {
        return false;
    }
}
