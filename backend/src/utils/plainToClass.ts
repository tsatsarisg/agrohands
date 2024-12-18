import { Document } from 'mongodb'

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function plainToClass<T>(
    jsonArray: Document[],
    typedClass: { new (props: any): T }
): T[] {
    return jsonArray.map(
        (jsonObject) =>
            new typedClass({ id: jsonObject._id.toString(), ...jsonObject })
    )
}
