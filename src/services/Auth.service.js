import { generateaccesstokenrefreshtoken } from "../Controller/User.controller.js"
import { FindEmail , createUser, findLogin, logged} from "../repository/Auth.repository.js"
import { User } from "../Models/User.model.js"
import { employee } from "../Models/Employee.model.js"
import { uploadInCloudinary } from "../utils/Cloudinary.js"
import { FindEmployee } from "../repository/Auth.repository.js"

export const AuthUser = async(data , file) => {

    if([data.username , data.email , data.password].some((feilds) => !feilds.trim() === "")){
        const error = new Error("All feilds are required")
        error.statusCode = 404
        throw error
    }
    const exsistingUser = await FindEmail(data.email)
    console.log(exsistingUser)
    if(exsistingUser){
        const error = new Error("User already exsist")
        error.statusCode = 404
        throw error
    }

    const uploadinCloudinaryfile = await uploadInCloudinary(file)
    if(!uploadinCloudinaryfile){
        const error = new Error("File not uploaded")
        error.statusCode = 404
        throw error
    } 
    const createuser = await createUser(data , uploadinCloudinaryfile)
    return createuser;

}

export const LoginUser = async (data) => {

    if (!data.email || !data.password) {
        const error = new Error("Email and password are required");
        error.statusCode = 400;
        throw error;
    }

    let findUser = await findLogin(data.email);
    let AccountModel = User;

    if (!findUser) {
        findUser = await FindEmployee(data.email);

        if (!findUser) {
            const error = new Error("Invalid email or password");
            error.statusCode = 401;
            throw error;
        }
        AccountModel = employee;
    }

    console.log("findUser", findUser);
    console.log("data.password", data.password);
    

    const passwordCheck = await findUser.isPasswordCorrect(data.password);
    

    if (!passwordCheck) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const { accesstoken, refreshtoken } =
        await generateaccesstokenrefreshtoken(findUser._id, AccountModel);

    const user = findUser.toObject();
    delete user.password;
    delete user.refreshtoken;

    return {
        user,
        accesstoken,
        refreshtoken,
    };
};