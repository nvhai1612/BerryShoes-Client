import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import Select from 'react-select';
import Swal from 'sweetalert2'
import { getMethod ,deleteMethod, uploadMultipleFile, postMethodPayload, postMethod} from '../services/request';

async function handleChangePass(event) {
    event.preventDefault();
    if(event.target.elements.newpass.value != event.target.elements.renewpass.value){
        toast.error("Mật khẩu xác nhận không trùng khớp"); return;
    }
    const payload = {
        oldPass: event.target.elements.oldpass.value,
        newPass: event.target.elements.newpass.value
    };
    const res = await postMethodPayload('/api/v1/auth/user/change-password', payload);
    if (res.status == 417) {
        var result = await res.json()
        toast.warning(result.defaultMessage);
    }
    if(res.status < 300){
        toast.success("Đã đổi mật khẩu thành công! Hãy đăng nhập lại")
    }
};

function DoiMatKhau(){
    useEffect(()=>{
    }, []);
  
    return(
        <>
            <div class="headeraccount">
                <span class="fontyel"></span><span class="smyl"> Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</span>
            </div>
            <div class="col-lg-9 col-md-8 col-sm-12 col-12 passacc">
                <form onSubmit={handleChangePass} autocomplete="off">
                    <label class="lbacc">Mật khẩu hiện tại *</label>
                    <input name="oldpass" type="password" class="form-control" required/>
                    <label class="lbacc">Mật khẩu mới *</label>
                    <input name="newpass" type="password" class="form-control" required/>
                    <label class="lbacc">Xác nhận mật khẩu mới *</label>
                    <input name="renewpass" type="password" class="form-control" required/>
                    <br/>
                    <button type="submit" class="btndoimk">LƯU</button>
                </form>
            </div>
        </>
    );
}

export default DoiMatKhau;
