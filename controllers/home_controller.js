const Post = require('../models/post');
const User = require('../models/user');



module.exports.home = async function(req,res){

    try{
        //populate the user of each point 
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: { 
                path: 'user likes',
            }
        }).populate('likes'); 
        let users = await User.find({});

        let friends;
        if(req.user){
         friends = await User.find({friendships: req.user.id})
        }

        return res.render('home',{
            title : "Home",
            posts : posts,
            all_users: users,
            friendships: friends
        });
    }catch(err){
        console.log('Error',err);
        return;
    }
   
   
}

// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()
