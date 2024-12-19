export const DELAY = async (time: number): Promise<unknown> =>
    new Promise((resolve) => {
        setTimeout(resolve, Math.max(0, time));
    });
