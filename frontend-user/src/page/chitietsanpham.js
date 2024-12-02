import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { getMethod ,uploadSingleFile, uploadMultipleFile, postMethodPayload} from '../services/request';
import { formatMoney} from '../services/money';
import {toast } from 'react-toastify';

function ChiTietSanPham(){
    const [product, setProduct] = useState(null);
    const [selectChiTiet, setSelectChiTiet] = useState(null);
    const [indexmausac, setIndexmausac] = useState(-1);
    const [indexkichthuoc, setindexkichthuoc] = useState(-1);
    const [sanPhamChiTiet, setSanPhamChiTiet] = useState([]);
    const [kichthuoc, setKichthuoc] = useState([]);
    const [mausac, setMauSac] = useState([]);
    const [anhs, setAnhs] = useState([]);
    const [sanPhamLienQuan, setsanPhamLienQuan] = useState([]);
    
    useEffect(()=>{
        getProduct();
        getChiTietSanPham();
        getProductLienQuan();
    }, []);

    const getProduct= async() =>{
        var uls = new URL(document.URL)
        var id = uls.searchParams.get("id");
        if(id != null){
            var response = await getMethod('/api/san-pham/' + id);
            var result = await response.json();
            setProduct(result)
        }
    };

    const getProductLienQuan= async() =>{
        var uls = new URL(document.URL)
        var id = uls.searchParams.get("id");
        if(id != null){
            var response = await getMethod('/api/san-pham/san-pham-lien-quan?id=' + id);
            var result = await response.json();
            setsanPhamLienQuan(result)
        }
    };

    async function getChiTietSanPham() {
        var uls = new URL(document.URL)
        var id = uls.searchParams.get("id");
        var response = await getMethod('/api/san-pham-chi-tiet/findBySanPham?sanpham='+id);
        var result = await response.json();
        setSanPhamChiTiet(result)
        var listmausac = []
        var listAnh = []
        for(var i=0; i< result.length; i++){
            var checked = false
            for(var j=0; j< listmausac.length; j++){
                if(listmausac[j].mauSac.id == result[i].mauSac.id){
                    checked = true
                }
            }
            if(checked == false){
                listmausac.push(result[i])
            }
            listAnh = listAnh.concat(result[i].anhs)
        }
        setMauSac(listmausac)
        setAnhs(listAnh)
        
    }

    function loadKichThuoc(item, index){
        setIndexmausac(index)
        var listkichthuoc = []
        for(var i=0; i< sanPhamChiTiet.length; i++){
            if(sanPhamChiTiet[i].mauSac.id == item.mauSac.id){
                listkichthuoc.push(sanPhamChiTiet[i])
            }
        }
        setKichthuoc(listkichthuoc)
        setindexkichthuoc(-1)
        setSelectChiTiet(null)
    }

    function setChiTietSpChon(item, index){
        setindexkichthuoc(index)
        setSelectChiTiet(item)
    }

    async function addToCart() {
        const res = await postMethodPayload('/api/gio-hang/add?idChiTietSanPham='+selectChiTiet.id)
        if(res.status < 300){
            toast.success('Success!');
        }
        if (res.status == 417) {
            var result = await res.json()
            toast.error(result.defaultMessage);
        }
    };

    return(
        <div class="maincontentweb">
        <div class="containercustom container">
            <div class="container-fluid">
            <div class="bgwhite">
                    <div class="row">
                        <div class="col-sm-12">
                            <h4 class="pronamedetail" id="detailnamepro">{product?.tenSanPham}</h4>
                            <div class="row">
                                <div class="col-sm-7">
                                    <div id="carouselExampleControls" class="carousel slide bannerindex" data-bs-ride="carousel">
                                        <div class="carousel-inner">
                                            <div class="carousel-item active">
                                                <img src={product?.anh} class="d-block w-100" alt="..."/>
                                            </div>
                                            {anhs.map((item, index) => {
                                            return <div class="carousel-item">
                                            <img src={item.tenAnh} class="d-block w-100" alt="..."/>
                                        </div>
                                            })}
                                        </div>
                                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        </button>
                                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-sm-5">
                                    <div>
                                        <strong class="newpricestr" id="pricedetail">{formatMoney(product?.giaBan)}</strong>
                                    </div>
                                    <span id="storagedetaillable" class="storagedetaillable">Lựa chọn màu sắc</span>
                                    <div class="listsize row" id="listcolor">
                                    {mausac.map((item, index) => {
                                        const divClass = `${'colorcdiv'} ${index === indexmausac ? 'activecolor' : ''}`;
                                        return (
                                            <div className="col-lg-3 col-md-3 col-sm-6 col-6" key={index}>
                                            <div className={divClass} onClick={() => loadKichThuoc(item,index)}>
                                                <span className="storagedetail">{item.mauSac.tenMauSac}</span><br/>
                                            </div>
                                            </div>
                                        );
                                    })}
                                    </div>
                                    <span id="storagedetaillable" class="storagedetaillable">Lựa chọn kích thước</span>
                                    <div class="listsize row" id="listcolor">
                                    {kichthuoc.map((item, index) => {
                                        const divClass = `${item.soLuong === 0 ? 'colorcdiv hetsp' : 'colorcdiv'} ${index === indexkichthuoc ? 'activecolor' : ''}`;
                                        return (
                                            <div className="col-lg-3 col-md-3 col-sm-6 col-6" key={index}>
                                            <div className={divClass} onClick={() => {
                                                                        if (item.soLuong > 0) {
                                                                            setChiTietSpChon(item, index);
                                                                        }
                                                                        }}>
                                                <span className="storagedetail">{item.kichCo.tenKichCo}</span><br/>
                                                <span className="pricestorage">{formatMoney(item.giaTien)}</span>
                                            </div>
                                            </div>
                                        );
                                    })}
                                    </div>
                                    <button disabled={selectChiTiet == null} onClick={()=>addToCart()} class={selectChiTiet != null?'btnthemgiohang':'btnthemgiohang disablethemgh'}><i className='fa fa-shopping-bag'></i> Thêm giỏ hàng</button>
                                    <div class="cauhinhchitiet">
                                <p class="tieudesanpham">Thông tin sản phẩm</p>
                                <div id="thongtincauhinh" class="thongtincauhinhdv">
                                    <span class="congnghect">Mã sản phẩm: <span class="chitietcongnghe">{product?.maSanPham}</span></span>
                                    <span class="congnghect">Thương hiệu: <span class="chitietcongnghe">{product?.thuongHieu?.tenThuongHieu}</span></span>
                                    <span class="congnghect">Chất liệu: <span class="chitietcongnghe">{product?.chatLieu?.tenChatLieu}</span></span>
                                    <span class="congnghect">Đế giày: <span class="chitietcongnghe">{product?.deGiay?.tenDeGiay}</span></span>
                                </div>
                            </div>
                                </div>
                            </div>

                            <div class="sanphamtuongtudetail">
                                <p class="tieudesanpham">Sản phẩm cùng thương hiệu</p>
                                <div id="listsanphamlienquan" class="row">
                                {sanPhamLienQuan.map((item=>{
                                    return <div class="col-lg-3 col-md-12 col-sm-12 col-12">
                                    <div class="singleproduct">
                                        <a href={'chitietsanpham?id='+item.id}><img src={item.anh} class="productimg"/></a>
                                        <div class="contentsinglepro">
                                            <p class="productname"><a class="productname" href={'chitietsanpham?id='+item.id}>{item.tenSanPham}</a></p>
                                            <div class="priceproduct">
                                                <strong class="newprice">{formatMoney(item.giaBan)}</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                }))}
                                </div>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default ChiTietSanPham;
