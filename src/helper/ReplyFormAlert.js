import Swal from "sweetalert2";
import {SuccessToast} from "./ValidationHelper.js";
import {ReplyPostRequest} from "../ApiServices/PostApiRequest.js";

export async function ReplyFormAlert(commentId,postId) {


   let result = await Swal.fire({
        title: 'Write a reply',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
            //return input;
        },
        allowOutsideClick: () => !Swal.isLoading(),
       inputValidator: ( async (value) => {
               await ReplyPostRequest(value,commentId,postId)
       })
    });


}