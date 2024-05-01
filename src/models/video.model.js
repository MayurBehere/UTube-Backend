import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";  //for pagination
// pagination is a technique used to break down a large dataset into smaller parts.
// used as a plugin to the mongoose schema

const videoSchema = new Schema(
    {
        videoFile :{
            type : String,  // we'll get it from cloudnary URL
            required : true,
        },
        thumbnail :{
            type : String,
            required : true,
        },
        title :{
            type : String,
            required : true,
        },
        description :{
            type : String,  
            required : true,
        },
        duration :{
            type : Number,   // we'll get it from cloudnary URL
            required : true,
        },
        views :{
            type : Number,   
            default : 0,
        },
        isPublished :{
            type : Boolean,   
            required : true,
        },
        owner :{
           type : Schema.Types.ObjectId,
           ref: "User"
        },
        
    },{
        timestamps :true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)  //for pagination

const Video = mongoose.model("Video",videoSchema)