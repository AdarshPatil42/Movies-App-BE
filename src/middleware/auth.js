const jwt =require('jsonwebtoken');
// const sectretkey1 = process.env.ACCESS_TOKEN_SECRET_KEY1
const secretKey2 = process.env.ACCESS_TOKEN_SECRET_KEY2


// const adminAuth= async(req, res, next)=>{
//     try {
//         const bearerHeader = await req.headers.authorization;
//         if(bearerHeader){
//             const token = await bearerHeader.split(" ")[1];
//             const user = await jwt.verify(token, sectretkey1);
//             req.userId = user.id;
//         }else{
//             res.status(400).json({messsge:"Unauthorized User.."})
//         }
//         next();
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({messsge:"Unauthorized User.."})
//     }
// }

// const userAuth= async(req, res, next)=>{
//     try {
//         const bearerHeader = await req.headers.authorization;
//         if(bearerHeader){
//             const token = await bearerHeader.split(" ")[1];
//             const user = await jwt.verify(token, secretKey2);
//             console.log(user.role)
//             req.userId = user.id;
//         }else{
//             res.status(400).json({messsge:"Unauthorized User.."})
//         }
//         next();
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({messsge:"Unauthorized User.."})
//     }
// }

// const isAdminAuth = (permissions)=>{
//      return (req, res, next)=>{
//         const userRole = req.body.role;
//         if(permissions.includes(userRole)){
//             next();
//         }else{
//             res.status(401).json({message:"You don't have Permission..!"})
//         }
//     }
// }

const auth = (permissions)=>{
    return async(req,res, next)=>{
        try {
            const bearerHeader = await req.headers.authorization;
            if(bearerHeader){
                // const token = await bearerHeader.split(" ")[1];
                const user = await jwt.verify(bearerHeader, secretKey2);
                req.userId = user.id;

                if(permissions.includes(user.role)){
                    next();
                }else{
                    res.status(401).json({message:"You don't have Permission..!"})
                }
            }else{
                res.status(401).json({messsge:"Unauthorized User.."}) 
            }
        } catch (error) {
            console.log(error);
            res.status(401).json({messsge:"Unauthorized User.."})
        } 
    }
}

module.exports = { auth};