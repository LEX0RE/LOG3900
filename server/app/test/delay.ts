export const delay = async (time: number): Promise<unknown> =>
    new Promise((resolve) => {
        setTimeout(resolve, Math.max(0, time));
    });
export const RESPONSE_DELAY = 500;
