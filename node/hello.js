var getUserComments = function(callback) {
    // perform asynch operation like ajax call
    var numOfCommets = 34;
    callback({ comments: numOfCommets });
};
var User = {
    fullName: 'John Black',
    print: function() {
        getUserComments(function(msg, data) {
            console.log(this.fullName + ' made ' + data.comments + ' comments' + msg);
        }.bind(this, ' and 2 blog posts.'));
    }
};
User.print();
