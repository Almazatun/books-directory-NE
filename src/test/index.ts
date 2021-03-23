export const mockResponse = () => {
    const res: { [key: string]: any } = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

export const mockRequest = () => {
    const req: { [key: string]: any } = {};
    req.body = jest.fn().mockReturnValue(req);
    return req;
};