import RefreshModel from "@/models/refreshModel"
class RefreshModelOperation{
    async storeRefeshTokenToDb(refreshToken:any,userId:any){
        try {
            // check user exist or not
            const user=await RefreshModel.findOne({userId})
            if(!user){
                const newRefreshTokenToDb=await RefreshModel.create({refreshToken,userId})
                await newRefreshTokenToDb.save()
                return
            }
        await RefreshModel.updateOne({userId},{refreshToken})
        return
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}
// eslint-disable-next-line
export default new RefreshModelOperation()