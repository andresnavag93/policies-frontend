export interface Address {
    id: number;
    client_id: number;
    state_id: number;
    state: {
        id: number,
        name: string
    };
    city: string;
    line_1: string;
    line_2: string;
    created_at: Date;
    updated_at: Date;
}
