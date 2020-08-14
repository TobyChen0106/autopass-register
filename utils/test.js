axios = require('axios');

// axios.get("https://data.cardbo.info/autopass-api/getusers/?key=UtEQf3SsWgOSalrIpdkH0FJae1OmWknVVlGVw9a7asKWZd7w2qXMXcmlqSgBn2GI",
// {

// }).then(
//     res => res.data
// ).then(data => {
//     if (data) {
//         console.log(data)
//     }
// }).catch(error => console.log(error));

axios.post("https://data.cardbo.info/autopass-api/update-user/?key=UPEvbZ8dPPc7JABil1FVvnufbMniK9dTs3JFMq6wm2kXx6WQ53Pd5boftdzNka0T",
    {
        lineid: "U1cdef6b4343c79712172aa8dd4a8ea93",
        // addCards: [
        //     '123',
        //     '456'
        // ],
        deleteCards: [
            '242bbbe5-1177-4138-ace0-56941edcfd8b',
        ]
    }).then(
        res => res.data
    ).then(data => {
        if (data) {
            console.log(data)
        }
    }).catch(error => console.log(error));