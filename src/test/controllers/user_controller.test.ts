import "reflect-metadata";
import sinon from 'sinon';
import {Request, Response} from "express";
import {UserService} from "../../user/user_service";
import {MockUserRepo} from "../../user/mock_user_repo";
import {UserController} from "../../user/user_controller";
import {IBookDataAccessLayer} from "../../book/types";

const mockResponse = () => {
    const res: { [key: string]: any } = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockRequest = () => {
    const req: { [key: string]: any } = {};
    req.body = jest.fn().mockReturnValue(req);
    return req;
};



describe("UserController", () => {

    let userService: any;
    const req = mockRequest();
    const res = mockResponse();

    beforeEach(() => {
        userService = new UserService(
            new MockUserRepo(),
            {} as IBookDataAccessLayer
        )
    });

    test("should be registered new user", async () => {

        const registerUserData = {
            id: "1",
            userName: "Person1",
            userBooks: [],
            email: "person1@gmail.com",
            password: "person112345@",
            createdAt: "2021",
            doc: {}
        }

        sinon.stub(userService, "createNewUser").returns(registerUserData);

        const user = await new UserController(userService).registerUser(req as Request, res as Response);

        expect(user.id).toEqual(registerUserData.id);
        expect(user.id).not.toEqual("2");
        expect(user.userBooks).toEqual(registerUserData.userBooks);
        expect(user.email).toEqual(registerUserData.email);
        expect(user.email).not.toEqual("person1@gmail.ru");
    });

    test( "should be logged in a user" ,async () => {
        const userLogIn = {
            email: "person1@gmail.com",
            password: "person112345@",
        }

        sinon.stub(userService, "logIn").returns(userLogIn);

        const user = await new UserController(userService).logInUser(req as Request, res as Response);

        expect(user.email).toEqual(userLogIn.email);
        expect(user.email).not.toEqual("person2@gmail.com");
    });

    test( "should be log out a user" ,async () => {

        sinon.stub(userService, "logOut")

        const user = await new UserController(userService).logOutUser(req as Request, res as Response);

        res.status(200);
        res.json({
            message: "Logged out successfully"
        })
    });

})