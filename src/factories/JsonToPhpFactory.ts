import PhpClassFactory from '@/factories/PhpClassFactory';
import PhpClass from '@/dto/PhpClass';

export default class JsonToPhpFactory {
    public static make(content: string): PhpClass {
        let jsonObject;

        try {
            jsonObject = JSON.parse(content);
        } catch (e) {
            throw new Error('Unable to decode json content');
        }

        return PhpClassFactory.make(jsonObject, import.meta.env.VITE_ROOT || 'RootObject');
    }
}
