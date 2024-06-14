var Model = require("../../Models/DB_Shoes");

exports.GetAllBrand = async (req, res, next) => {
  msg = "Danh sach Du Lieu Thuong Hieu";

  try {
    let list = await Model.TypeShoeModel.find();
    //console.log(list);
    list.forEach((item) => {
      console.log("Tên Thương Hiệu");
      console.log(item.nameType);
      console.log("---------------");
    });
    //   return  res.status(200).json({msg: 'lấy địa chỉ thành công', data: list});
    return res.status(200).json(list);
    // Log List
  } catch (error) {
    return res.status(204).json({ msg: "không có dữ liệu" + error.message });
  }
  // res.status(200).json({msg});
};
exports.AddBrand_1 = async (req, res, next) => {
  let list = await Model.TypeShoeModel.find();
  // Lấy thông tin đăng ký từ req.body
  let nameType = req.body.nameType;
  let imageType = req.body.imageType;
  try {
    // Tạo một đối tượng người dùng mới và lưu vào cơ sở dữ liệu
    let objSP = new Model.TypeShoeModel({
      nameType: req.body.nameType,
      imageType: req.body.imageType,
    });
    // Kiểm tra tính hợp lệ của thông tin đăng ký
    if (!nameType || !imageType) {
      // Thông tin đăng ký không hợp lệ
      // Trả về thông báo lỗi cho client
      res.json({ success: false, message: "Vui lòng nhập đầy đủ thông tin" });
      return;
    }

    // Kiểm tra xem tên đăng nhập đã tồn tại chưa
    let shoes = await Model.TypeShoeModel.findOne({ nameType: nameType });
    if (shoes) {
      // Tên đăng nhập đã tồn tại
      // Trả về thông báo lỗi cho client
      res.json({ success: false, message: "Thương Hiệu đã tồn tại" });
      return;
    }
    let new_Br = await objSP.save();
    // Đăng ký thuơng hiệu thành công
    // Trả về thông báo thành công cho client
    res.json({ success: true, message: "Đăng ký thuơng hiệu thành công" });
  } catch (error) {
    msg = "Lỗi " + error.message;
    cconsole.log(error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
};

exports.FindBrand = async (req, res, next) => {
  try {
    let brandId = req.params.id;
    let brand = await Model.TypeShoeModel.findById(brandId);
    if (brand) {
      console.log(brand);
      return res.status(200).json(brand);
    } else {
      return res.status(404).json({ msg: "Không tìm sản phẩm với id này" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Có lỗi xảy ra: " + error.message });
  }
  // res.status(200).json({msg});
};

exports.AddBrand = async (req, res, next) => {
  const { nameType, imageType } = req.body;
  if (!nameType || !imageType) {
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng nhập đầy đủ thông tin" });
  }

  try {
    const checkShoe = await Model.TypeShoeModel.findOne({ nameType });
    if (checkShoe) {
      return res
        .status(400)
        .json({ success: false, message: "Thương Hiệu đã tồn tại" });
    }
    const newShoe = new Model.TypeShoeModel({ nameType, imageType });
    await newShoe.save();
    console.log(`Đăng ký thương hiệu thành công: ${nameType}`);
    return res
      .status(200)
      .json({ success: true, message: "Đăng ký thuơng hiệu thành công" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
};
exports.UpdateBrand = async (req, res, next) => {
  const { nameType, imageType } = req.body;
  let id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng cung cấp id" });
  }

  try {
    const idBrand = await Model.TypeShoeModel.findById(id);
    if (!idBrand) {
      return res
        .status(400)
        .json({ success: false, message: "id không được để trống" });
    }
    idBrand.nameType = nameType || idBrand.nameType;
    idBrand.imageType = imageType || idBrand.imageType;
    await idBrand.save();
    console.log(`Đã cập nhật thương hiệu: ${idBrand.nameType}`);
    return res
      .status(200)
      .json({ success: true, message: "Đã cập nhật thương hiệu thành công" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
};

exports.DeleteBrand = async (req, res, next) => {
  let id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "id không được để trống" });
  }
  try {
    const idBrand = await Model.TypeShoeModel.findById(id);
    if (!idBrand) {
      return res
        .status(400)
        .json({ success: false, message: "Thương hiệu không tồn tại" });
    }
    await Model.TypeShoeModel.findByIdAndDelete(id);
    console.log(`Đã xóa thương hiệu`);
    return res
      .status(200)
      .json({ success: true, message: "Đã xóa thương hiệu thành công" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Lỗi máy chủ" });
  }
};

// exports.FindProductsByBrandId = async (req, res, next) => {
//   try {
//     let brandId = req.params.id;
//     let shoes = await Model.ShoeModel.find({ brandShoe: brandId })
//     .populate('sizeShoe')
//     .populate('brandShoe')
//     .populate('imageShoe')
//     .populate('colorShoe');
//     if (shoes.length > 0) {
//       shoes = shoes.map(shoe => {
//         shoe.sizeShoe = shoe.sizeShoe.filter(size => size.isEnable);
//         return shoe;
//       });
//       console.log(shoes);
//       return res.status(200).json(shoes);
//     } else {
//       return res
//         .status(404)
//         .json({ msg: "Không tìm thấy sản phẩm nào của thương hiệu này" });
//     }
//   } catch (error) {
//     return res.status(500).json({ msg: "Có lỗi xảy ra: " + error.message });
//   }
// };

exports.FindProductsByBrandId = async (req, res, next) => {
  try {
    let brandId = req.params.id;
    let shoes = await Model.ShoeModel.find({ brandShoe: brandId })
      // .populate({
      //   path: 'shoeDetail',
      //   populate: [
      //     { path: 'sizeShoe', match: { isEnable: true } },
      //     { path: 'imageShoe' },
      //     { path: 'colorShoe' },
      //   ]
      // })
      .populate("brandShoe");

    if (shoes.length > 0) {
      shoes = shoes.map((shoe) => {
        if (shoe.shoeDetail) {
          shoe.shoeDetail.sizeShoe = shoe.shoeDetail.sizeShoe.filter(
            (size) => size.isEnable
          );
        }
        return shoe;
      });

      console.log(shoes);
      return res.status(200).json(shoes);
    } else {
      return res
        .status(404)
        .json({ msg: "Không tìm thấy sản phẩm nào của thương hiệu này" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Có lỗi xảy ra: " + error.message });
  }
};

// exports.findShoes_DATA = async (req, res, next) => {
//   try {
//     const { idBrand, sizeId, idColor, shoeId } = req.query; // Sử dụng query parameters
//     let query = {};
//     let match = {};

//     if (idBrand) query.brandShoe = idBrand;
//     if (shoeId) query.shoeId = shoeId;
//     if (sizeId) match.sizeId = sizeId;
//     if (idColor) match.colorShoe = idColor;

//     const shoes = await Model.ShoeModel.find(query)
//       .populate({
//         path: 'shoeDetail',
//         populate: {
//            path: 'sizeShoe', match: { _id: sizeId } ,
//            path: 'colorShoe', match: { _id: idColor }
//         },
//       });

//     const filteredShoes = shoes.filter(shoe => shoe.shoeDetail);

//     if (filteredShoes.length > 0) {
//       return res.status(200).json(filteredShoes);
//     } else {
//       return res
//         .status(404)
//         .json({ msg: "Không tìm thấy sản phẩm nào phù hợp" });
//     }
//   } catch (error) {
//     return res.status(500).json({ msg: "Có lỗi xảy ra: " + error.message });
//   }
// };


// exports.findShoes_DATA = async (req, res, next) => {
//   try {
//     const { idBrand, sizeId, idColor, shoeId } = req.query; // Sử dụng query parameters
//     let query = {};
//     let populateSizeShoe = sizeId ? { path: "sizeShoe", match: { sizeId: sizeId } } : { path: "sizeShoe" };
//     let populateColorShoe = idColor ? { path: "colorShoe", match: { _id: idColor } } : { path: "colorShoe" };

//     if (idBrand) query.brandShoe = idBrand;
//     if (shoeId) query.shoeId = shoeId;

//     const shoes = await Model.ShoeModel.find(query)
//       .populate({
//         path: "shoeDetail",
//         populate: [populateSizeShoe, populateColorShoe]
//       });

//     const filteredShoes = shoes.filter(shoe => {
//       const detail = shoe.shoeDetail;
//       return detail && (!sizeId || detail.sizeShoe.length > 0) && (!idColor || detail.colorShoe);
//     });

//     if (filteredShoes.length > 0) {
//       return res.status(200).json(filteredShoes);
//     } else {
//       return res.status(404).json({ msg: "Không tìm thấy sản phẩm nào phù hợp" });
//     }
//   } catch (error) {
//     return res.status(500).json({ msg: "Có lỗi xảy ra: " + error.message });
//   }
// };

// exports.findShoes_DATA = async (req, res, next) => {
//   try {
//     // Lấy tham số từ query hoặc params
//     const params = req.params.idBrand ? req.params : req.query;
//   const { idBrand, sizeId, idColor, shoeId } = params;
//     let query = {};
//     let populateOptions = [];

//     if (idBrand) query.brandShoe = idBrand;
//     if (shoeId) query.shoeId = shoeId;

//     // Xây dựng các tùy chọn populate dựa trên tham số có sẵn
//     if (sizeId) {
//       populateOptions.push({
//         path: 'sizeShoe',
//         match: { sizeId: sizeId }
//       });
//     }
//     if (idColor) {
//       populateOptions.push({
//         path: 'colorShoe',
//         match: { _id: idColor }
//       });
//     }

//     // Tìm kiếm và populate dữ liệu
//     const shoes = await Model.ShoeModel.find(query).populate({
//       path: 'shoeDetail',
//       populate: populateOptions
//     });

//     // Lọc và trả về kết quả dựa trên điều kiện match
//     const filteredShoes = shoes.filter(shoe => {
//       const detail = shoe.shoeDetail;
//       return detail && (!sizeId || detail.sizeShoe.length > 0) && (!idColor || detail.colorShoe);
//     });

//     if (filteredShoes.length > 0) {
//       return res.status(200).json(filteredShoes);
//     } else {
//       return res.status(404).json({ msg: "Không tìm thấy sản phẩm nào phù hợp" });
//     }
//   } catch (error) {
//     return res.status(500).json({ msg: "Có lỗi xảy ra: " + error.message });
//   }
// };

// exports.findShoes_DATA = async (req, res, next) => {
//   try {
//     const { idBrand, sizeId, idColor, shoeId } = req.params;
//     let query = {};
//     let populateOptions = [];

//     if (idBrand) query.brandShoe = idBrand;
//     if (shoeId) query.shoeId = shoeId;

//     if (sizeId) {
//       populateOptions.push({
//         path: 'sizeShoe',
//         match: sizeId !== 'null' ? { sizeId: sizeId } : {}
//       });
//     } else {
//       populateOptions.push({ path: 'sizeShoe' });
//     }

//     if (idColor) {
//       populateOptions.push({
//         path: 'colorShoe',
//         match: idColor !== 'null' ? { _id: idColor } : {}
//       });
//     } else {
//       populateOptions.push({ path: 'colorShoe' });
//     }

//     const shoes = await Model.ShoeModel.find(query).populate({
//       path: 'shoeDetail',
//       populate: populateOptions
//     });

//     const filteredShoes = shoes.filter(shoe => {
//       const detail = shoe.shoeDetail;
//       return detail && (!sizeId || sizeId === 'null' || detail.sizeShoe.length > 0) && (!idColor || idColor === 'null' || detail.colorShoe);
//     });

//     if (filteredShoes.length > 0) {
//       return res.status(200).json(filteredShoes);
//     } else {
//       return res.status(404).json({ msg: "Không tìm thấy sản phẩm nào phù hợp" });
//     }
//   } catch (error) {
//     return res.status(500).json({ msg: "Có lỗi xảy ra: " + error.message });
//   }
// };



// exports.findShoes_DATA = async (req, res, next) => {
//   try {
//     const { idBrand, sizeId, idColor, shoeId } = req.params;
//     let query = {};
//     let populateOptions = [];

//     // Thêm điều kiện vào query nếu params được cung cấp và không phải là 'null'
//     if (idBrand && idBrand !== 'null') query.brandShoe = idBrand;
//     if (shoeId && shoeId !== 'null') query.shoeId = shoeId;

//     // Xây dựng các tùy chọn populate dựa trên params không phải là 'null'
//     if (sizeId && sizeId !== 'null') {
//       populateOptions.push({
//         path: 'sizeShoe',
//         match: { sizeId: sizeId }
//       });
//     } else {
//       populateOptions.push({ path: 'sizeShoe' });
//     }

//     if (idColor && idColor !== 'null') {
//       populateOptions.push({
//         path: 'colorShoe',
//         match: { _id: idColor }
//       });
//     } else {
//       populateOptions.push({ path: 'colorShoe' });
//     }

//     // Tìm kiếm và populate dữ liệu
//     const shoes = await Model.ShoeModel.find(query).populate({
//       path: 'shoeDetail',
//       populate: populateOptions
//     });

//     // Lọc và trả về kết quả dựa trên điều kiện match
//     const filteredShoes = shoes.filter(shoe => {
//       const detail = shoe.shoeDetail;
//       return detail && (!sizeId || sizeId === 'null' || detail.sizeShoe.length > 0) && (!idColor || idColor === 'null' || detail.colorShoe);
//     });

//     if (filteredShoes.length > 0) {
//       return res.status(200).json(filteredShoes);
//     } else {
//       return res.status(404).json({ msg: "Không tìm thấy sản phẩm nào phù hợp" });
//     }
//   } catch (error) {
//     return res.status(500).json({ msg: "Có lỗi xảy ra: " + error.message });
//   }
// };

// exports.findShoes_DATA = async (req, res, next) => {
//   try {
//     const { idBrand, sizeId, textColor, shoeId } = req.params;
//     let query = {};

//     if (idBrand && idBrand !== 'null') query.brandShoe = idBrand;
//     if (shoeId && shoeId !== 'null') query.shoeId = shoeId;

//     let shoes = await Model.ShoeModel.find(query)
//       .populate('brandShoe', 'nameType -_id')
//       .populate({
//         path: 'sizeShoe',
//         match: sizeId && sizeId !== 'null' ? { sizeId: sizeId } : {},
//         select: 'size -_id'
//       })
//       .populate({
//         path: 'colorShoe',
//         match: textColor && textColor !== 'null' ? { textColor: textColor } : {},
//         select: 'textColor codeColor -_id'
//       });

//     shoes = shoes.filter(shoe => {
//       const matchesSize = !sizeId || sizeId === 'null' || shoe.sizeShoe.some(size => size.sizeId === sizeId);
//       const matchesColor = !textColor || textColor === 'null' || shoe.colorShoe.some(color => color.textColor === textColor);
//       return matchesSize && matchesColor;
//     });

//     if (shoes.length > 0) {
//       return res.status(200).json(shoes);
//     } else {
//       return res.status(404).json({ msg: "Không tìm thấy sản phẩm nào phù hợp" });
//     }
//   } catch (error) {
//     return res.status(500).json({ msg: "Có lỗi xảy ra: " + error.message });
//   }
// };

exports.findShoes_DATA = async (req, res, next) => {
  try {
    const { idBrand, sizeId, textColor, shoeId } = req.params;
    let query = {};

    if (idBrand && idBrand !== 'null') query.brandShoe = idBrand;
    if (shoeId && shoeId !== 'null') query.shoeId = shoeId;

    let shoes = await Model.ShoeModel.find(query)
      .populate('brandShoe', 'nameType TypeId imageType _id')
      .populate({
        path: 'sizeShoe',
        match: sizeId && sizeId !== 'null' ? { sizeId: sizeId } : {},
        select: 'size sizeId _id'
      })
      .populate({
        path: 'colorShoe',
        match: textColor && textColor !== 'null' ? { textColor: textColor } : {},
        select: 'textColor codeColor _id'
      })
      .select('-__v');

    // Lọc kết quả dựa trên sizeId và textColor
    let filteredShoes = shoes.filter(shoe => {
      const matchesSize = !sizeId || sizeId === 'null' || shoe.sizeShoe.some(size => size.sizeId === sizeId);
      const matchesColor = !textColor || textColor === 'null' || shoe.colorShoe.some(color => color.textColor === textColor);
      return matchesSize && matchesColor;
    });

    if (filteredShoes.length > 0) {
      return res.status(200).json(filteredShoes);
    } else {
      return res.status(404).json({ msg: "Không tìm thấy sản phẩm nào phù hợp" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Có lỗi xảy ra: " + error.message });
  }
};




// exports.findShoesByDetails = async (req, res, next) => {
//   try {
//     const { idBrand, idSize, idColor } = req.params;

//     const shoes = await Model.ShoeModel.find({ brandShoe: idBrand })
//       .populate({
//         path: 'shoeDetail',
//         match: { sizeShoe: idSize, colorShoe: idColor },
//         populate: ['sizeShoe', 'colorShoe'],
//       });

//     if (shoes.length > 0) {
//       return res.status(200).json(shoes);
//     } else {
//       return res
//         .status(404)
//         .json({ msg: "Không tìm thấy sản phẩm nào phù hợp" });
//     }
//   } catch (error) {
//     return res.status(500).json({ msg: "Có lỗi xảy ra: " + error.message });
//   }
// };

// exports.findShoesByDetails = async (req, res, next) => {
//   try {
//     const { idBrand, sizeId, idColor, shoeId } = req.params;

//     // Tìm kiếm theo shoeId trước
//     const shoes = await Model.ShoeModel.find({ shoeId: shoeId, brandShoe: idBrand })
//       .populate({
//         path: 'shoeDetail',
//         match: { colorShoe: idColor },
//         populate: {
//           path: 'sizeShoe',
//           match: { sizeId: sizeId },
//         },
//       });

//     // Lọc ra những đôi giày thỏa mãn cả 4 điều kiện
//     const filteredShoes = shoes.filter(shoe => shoe.shoeDetail && shoe.shoeDetail.sizeShoe.length > 0);

//     if (filteredShoes.length > 0) {
//       return res.status(200).json(filteredShoes);
//     } else {
//       return res
//         .status(404)
//         .json({ msg: "Không tìm thấy sản phẩm nào phù hợp" });
//     }
//   } catch (error) {
//     return res.status(500).json({ msg: "Có lỗi xảy ra: " + error.message });
//   }
// };

exports.findShoesByDetails = async (req, res, next) => {
  try {
    const { idBrand, sizeId, idColor, shoeId } = req.params;
    let query = {};
    if (idBrand) query.brandShoe = idBrand;
    if (shoeId) query.shoeId = shoeId;

    const shoes = await Model.ShoeModel.find(query)
      // .populate({
      //   path: 'shoeDetail',
      //   populate: {
      //     path: 'sizeShoe colorShoe',
      //     match: { sizeId: { $in: [sizeId, idColor] } },
      //   },

      .populate({
        path: "shoeDetail",
        populate: [
          { path: "sizeShoe", match: { sizeId: sizeId } },
          { path: "colorShoe", colorShoe: { $in: [idColor] } },
        ],

        // path: "sizeShoe",
        // match: { sizeId: { _id:sizeId },
        // path:"colorShoe",
        // colorShoe: { $in: [idColor] } },

        // .populate({
        //   path: 'shoeDetail',
        //   populate: {
        //      path: 'sizeShoe', match: { _id: sizeId } ,
        //      path: 'colorShoe', match: { _id: idColor }
        //   },
      });

    const filteredShoes = shoes.filter((shoe) => shoe.shoeDetail);

    if (filteredShoes.length > 0) {
      return res.status(200).json(filteredShoes);
    } else {
      return res
        .status(404)
        .json({ msg: "Không tìm thấy sản phẩm nào phù hợp" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Có lỗi xảy ra: " + error.message });
  }
};

// exports.findShoesByDetails = async (req, res, next) => {
//   try {
//     const { idBrand, sizeId, idColor, shoeId } = req.params;
//     let query = {};
//     if (idBrand) query.brandShoe = idBrand;
//     if (shoeId) query.shoeId = shoeId;

//     const shoes = await Model.ShoeModel.find(query)
//       .populate({
//         path: 'shoeDetail',
//         populate: [
//           { path: 'sizeShoe', match: { sizeId: sizeId } },
//           { path: 'colorShoe', match: { _id: idColor } },
//         ],
//       });

//     const filteredShoes = shoes.filter(shoe => shoe.shoeDetail && shoe.shoeDetail.colorShoe);

//     if (filteredShoes.length > 0) {
//       return res.status(200).json(filteredShoes);
//     } else {
//       return res
//         .status(404)
//         .json({ msg: "Không tìm thấy sản phẩm nào phù hợp" });
//     }
//   } catch (error) {
//     return res.status(500).json({ msg: "Có lỗi xảy ra: " + error.message });
//   }
// };

// exports.AllProduct = async (req, res, next) => {
//   try {
//     let shoe = await Model.ShoeModel.find()
//       .populate({
//         path: "shoeDetail",
//         select: "sizeShoe imageShoe colorShoe",
//         populate: [
//           {
//             path: "sizeShoe",
//             match: { isEnable: true },
//             select: "size quanlity",
//           },
//           { path: "imageShoe", select: "imageShoe" },
//           { path: "colorShoe", select: "textColor codeColor" },
//         ],
//       })
//       .populate("brandShoe", "_id");

//     if (shoe) {
//       console.log(shoe);
//       return res.status(200).json(shoe);
//     } else {
//       return res.status(404).json({ msg: "Không tìm sản phẩm" });
//     }
//   } catch (error) {
//     return res.status(500).json({ msg: "Có lỗi xảy ra: " + error.message });
//   }
//   // res.status(200).json({msg});
// };
function removeUnnecessaryIds(data) {
  const cleanData = (obj) => {
    if (Array.isArray(obj)) {
      obj.forEach((item) => cleanData(item));
    } else if (typeof obj === 'object' && obj !== null) {
      delete obj._id;
      Object.values(obj).forEach((value) => cleanData(value));
    }
  };
  const dataCopy = JSON.parse(JSON.stringify(data));
  cleanData(dataCopy);
  return dataCopy;
}

// exports.AllProduct = async (req, res, next) => {
//   try {
//     let shoe = await Model.ShoeModel.find()
//       .populate({
//         path: "shoeDetail",
//         select: "sizeShoe imageShoe colorShoe",
//         populate: [
//           {
//             path: "sizeShoe",
//             match: { isEnable: true },
//             select: "size quanlity",
//           },
//           { path: "imageShoe", select: "imageShoe" },
//           { path: "colorShoe", select: "textColor codeColor" },
//         ],
//       })
//       .populate("brandShoe", "nameType");

//     if (shoe) {
//       const cleanedShoeData = removeUnnecessaryIds(shoe);
//       console.log(cleanedShoeData);
//       return res.status(200).json(cleanedShoeData);
//     } else {
//       return res.status(404).json({ msg: "Không tìm sản phẩm" });
//     }
//   } catch (error) {
//     return res.status(500).json({ msg: "Có lỗi xảy ra: " + error.message });
//   }
// };

exports.AllProduct = async (req, res, next) => {
  try {
    let shoes = await Model.ShoeModel.find()
      .populate({
        path: "sizeShoe",
        match: { isEnable: true },
        select: "size sizeId _id"
      })
      .populate({
        path: "imageShoe",
        select: "imageUrl _id"
      })
      .populate({
        path: "colorShoe",
        select: "textColor codeColor _id"
      })
      .populate("brandShoe", "nameType TypeId imageType _id")
      .populate({
        path: "storageShoe",
        select: "colorShoe sizeShoe _id"
      })

      .select("-__v");

    if (shoes.length > 0) {
      return res.status(200).json(shoes);
    } else {
      return res.status(404).json({ msg: "Không tìm thấy sản phẩm" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Có lỗi xảy ra: " + error.message });
  }
};


exports.FindProduct = async (req, res, next) => {
  try {
    let shoeId = req.params.id;
    let shoe = await Model.ShoeModel.findById(shoeId);
    if (shoe) {
      console.log(shoe);
      return res.status(200).json(shoe);
    } else {
      return res.status(404).json({ msg: "Không tìm sản phẩm với id này" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Có lỗi xảy ra: " + error.message });
  }
  // res.status(200).json({msg});
};

exports.FindProductsByName = async (req, res, next) => {
  try {
    let productName = req.query.name;
    let shoes = await Model.ShoeModel.find({ name: productName });
    if (shoes.length > 0) {
      console.log(shoes);
      return res.status(200).json(shoes);
    } else {
      return res
        .status(404)
        .json({ msg: "Không tìm thấy sản phẩm nào có tên này" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Có lỗi xảy ra: " + error.message });
  }
};

exports.FindByName = async (req, res, next) => {
  try {
    let conditions = {};
    if (req.query.name) {
      const productName = decodeURIComponent(req.query.name);
      conditions.name = new RegExp(productName, "i");
    }
    const shoes = await Model.ShoeModel.find(conditions);
    console.log("=Tìm Kiếm=");
    console.log("Số sản phẩm phù hợp: " + shoes.length);
    console.log("=Tìm Kiếm END=");
    return res.status(200).json(shoes);
  } catch (error) {
    console.error("Lỗi khi tìm kiếm sản phẩm:", error);
    return res.status(500).json({ msg: "Có lỗi xảy ra khi tìm kiếm sản phẩm" });
  }
};



exports.getTypeShoeById = async (req, res) => {
  try {
    const typeShoeId = req.params.id;
    const typeShoe = await Model.TypeShoeModel.findById(typeShoeId);
    if (!typeShoe) {
      return res.status(404).json({ msg: "Không tìm thấy ID này" });
    }
    return res.status(200).json(typeShoe);
  } catch (error) {
    console.error("Error fetching:", error);
    return res.status(500).json({ msg: "Có lỗi xảy ra khi lấy thông tin" });
  }
};
exports.updateTypeShoe = async (req, res) => {
  try {
    const typeShoeId = req.params.id;
    const updatedTypeShoe = await Model.TypeShoeModel.findByIdAndUpdate(
      typeShoeId,
      req.body,
      { new: true }
    );
    if (!updatedTypeShoe) {
      return res.status(404).json({ msg: "Không tìm thấy ID này" });
    }
    return res.status(200).json(updatedTypeShoe);
  } catch (error) {
    console.error("Error updating:", error);
    return res.status(500).json({ msg: "Có lỗi xảy ra khi cập nhật" });
  }
};
exports.deleteTypeShoe = async (req, res) => {
  try {
    const typeShoeId = req.params.id;
    const deletedTypeShoe = await Model.TypeShoeModel.findByIdAndDelete(
      typeShoeId
    );
    if (!deletedTypeShoe) {
      return res.status(404).json({ msg: "Không tìm thấy ID này" });
    }
    return res.status(200).json({ msg: "Xóa thành công" });
  } catch (error) {
    console.error("Error deleting TypeShoe:", error);
    return res.status(500).json({ msg: "Có lỗi xảy ra khi xóa" });
  }
};


// exports.addShoe = async (req, res) => {
//   try {
//     const { shoeName, brandName, color, sizes, price, description, images } = req.body;
    
//     // Tạo shoeId từ shoeName
//     const shoeId = brandName.toLowerCase().replace(/\s+/g, '-');
    
//     let shoe = await Model.ShoeModel.findOne({ name: shoeName });
//     if (shoe) {
//       return res.status(400).json({ message: 'Shoe already exists' });
//     }
    
//     let brand = await Model.TypeShoeModel.findOne({ nameType: brandName });
//     if (!brand) {
//       brand = new Model.TypeShoeModel({ nameType: brandName, imageType: images[0] });
//       await brand.save();
//     }
    
//     let shoeColor = await Model.ColorShoeModel.findOne({ textColor: color.textColor });
//     if (!shoeColor) {
//       shoeColor = new Model.ColorShoeModel({ textColor: color.textColor, codeColor: color.codeColor, isEnable: true });
//       await shoeColor.save();
//     }

//     const sizeIds = [];
//     for (const size of sizes) {
//       let newSize = await Model.SizeShoeModel.findOne({ size: size.size });
//       if (!newSize) {
//         newSize = new Model.SizeShoeModel({
//           size: size.size,
//           quantity: size.quantity,
//           isEnable: size.isEnable,
//           sizeId: size.size.replace(/\s+/g, '-')
//         });
//         await newSize.save();
//       }
//       sizeIds.push(newSize._id);
//     }

//     shoe = new Model.ShoeModel({
//       shoeId: shoeId,
//       name: shoeName,
//       price: price,
//       description: description,
//       brandShoe: brand._id,
//       shoeDetail: null,
//       thumbnail: images[0],
//       hidden: false
//     });
//     const savedShoe = await shoe.save();
//     const newImage = new Model.ImageShoeModel({
//       shoeId: savedShoe._id,
//       imageShoe: images
//     });
//     const savedImage = await newImage.save();

//     const newShoeDetail = new Model.ShoeDetailModel({
//       shoeId: savedShoe._id,
//       sizeShoe: sizeIds,
//       imageShoe: savedImage._id,
//       colorShoe: shoeColor._id
//     });
//     const savedShoeDetail = await newShoeDetail.save();
//     await Model.ShoeModel.findByIdAndUpdate(savedShoe._id, { shoeDetail: savedShoeDetail._id });

//     res.status(201).json({ message: 'Shoe created successfully', shoe: savedShoe });
//   } catch (error) {
//     console.error('Error during shoe creation: ', error);
//     res.status(500).json({ message: 'Internal Server Error', error });
//   }
// };


// exports.addShoe = async (req, res) => {
//   try {
//     const {
//       shoeId,
//       name,
//       price,
//       description,
//       brandShoe,
//       thumbnail,
//       hidden,
//       sizeShoe,
//       imageShoe,
//       colorShoe
//     } = req.body;

//     let shoe = await Model.ShoeModel.findOne({ shoeId });
//     if (shoe) {
//       return res.status(400).json({ message: 'Shoe already exists' });
//     }

//     // Create Shoe
//     shoe = new Model.ShoeModel({
//       shoeId,
//       name,
//       price,
//       description,
//       brandShoe,
//       thumbnail,
//       hidden,
//       shoeDetail: null // Placeholder
//     });
//     const savedShoe = await shoe.save();
//     console.log('Shoe created successfully:', savedShoe);

//     // Process sizes
//     const sizeIds = [];
//     for (const size of sizeShoe) {
//       let newSize = await Model.SizeShoeModel.findOne({ size });
//       if (!newSize) {
//         newSize = new Model.SizeShoeModel({
//           size: size,
//           quantity: 20, // Default quantity
//           isEnable: true,
//           sizeId: size.replace(/\s+/g, '-')
//         });
//         await newSize.save();
//       }
//       sizeIds.push(newSize._id);
//     }

//     // Create Images
//     const newImage = new Model.ImageShoeModel({
//       shoeId: savedShoe._id,
//       imageShoe: imageShoe
//     });
//     const savedImage = await newImage.save();
//     console.log('Image Array created:', savedImage);

//     // Create ShoeDetail
//     const newShoeDetail = new Model.ShoeDetailModel({
//       shoeId: savedShoe._id,
//       sizeShoe: sizeIds,
//       imageShoe: savedImage._id,
//       colorShoe: colorShoe
//     });
//     const savedShoeDetail = await newShoeDetail.save();
//     console.log('ShoeDetail created:', savedShoeDetail);

//     // Update Shoe with shoeDetail
//     const updatedShoe = await Model.ShoeModel.findByIdAndUpdate(
//       savedShoe._id,
//       { shoeDetail: savedShoeDetail._id },
//       { new: true }
//     );

//     res.status(201).json({ message: 'Shoe and ShoeDetail created successfully', shoe: updatedShoe });
//   } catch (error) {
//     console.error('Error during shoe creation: ', error);
//     res.status(500).json({ message: 'Internal Server Error', error });
//   }
// };

// const formatString = (inputString) => {
//   // Chuyển đổi chuỗi thành chữ thường và thay thế khoảng trắng bằng dấu gạch ngang
//   return inputString.toLowerCase().replace(/\s+/g, '-');
// };

// exports.addShoe = async (req, res) => {
//   try {
//     const {
//       name,
//       price,
//       description,
//       brandShoeId,
//       thumbnail,
//       status,
//       sizes,
//       imageShoe,
//       colorShoe
//     } = req.body;

//     let shoe = await Model.ShoeModel.findOne({ name });
//     if (shoe) {
//       return res.status(400).json({ message: 'Shoe already exists' });
//     }

//     const brand = await Model.TypeShoeModel.findById(brandShoeId);
//     const shoeId = formatString(brand.nameType);

//     shoe = new Model.ShoeModel({
//       shoeId,
//       name,
//       price,
//       description,
//       brandShoe: brandShoeId,
//       thumbnail,
//       status,
//       sizeShoe:sizeIds,
//       imageShoe:imageShoe,
//       colorShoe:colorShoe,
//     });

//     const savedShoe = await shoe.save();
//     console.log('Shoe created successfully:', savedShoe);

//     const sizeIds = [];
//     for (const size of sizes) {
//       let newSize = new Model.SizeShoeModel({
//         size: size.size,
//         isEnable: true,
//         sizeId: formatString(size.size)
//       });
//       await newSize.save();
//       sizeIds.push(newSize._id);
//     }

//   } catch (error) {
//     console.error('Error during shoe creation: ', error);
//     res.status(500).json({ message: 'Internal Server Error', error });
//   }
// };


const formatString = (inputString) => {
  return inputString.toLowerCase().replace(/\s+/g, '-');
};

// exports.addShoe = async (req, res) => {
//   try {
//     const {
//       name,
//       price,
//       description,
//       brandShoeId,
//       thumbnail,
//       status,
//       sizes,
//       imageShoe,
//       colorShoe
//     } = req.body;

//     let shoe = await Model.ShoeModel.findOne({ name });
//     if (shoe) {
//       return res.status(400).json({ message: 'Shoe already exists' });
//     }

//     const brand = await Model.TypeShoeModel.findById(brandShoeId);
//     const shoeId = formatString(brand.nameType);

//     const sizeIds = await Promise.all(sizes.map(async (size) => {
//       let newSize = new Model.SizeShoeModel({
//         size: size.size,
//         isEnable: true,
//         sizeId: formatString(size.size)
//       });
//       await newSize.save();
//       return newSize._id;
//     }));

//     const colorIds = await Promise.all(colorShoe.map(async (color) => {
//       let newColor = new Model.ColorShoeModel({
//         textColor: color.textColor,
//         codeColor: color.codeColor
//       });
//       await newColor.save();
//       return newColor._id;
//     }));

//     shoe = new Model.ShoeModel({
//       shoeId,
//       name,
//       price,
//       description,
//       brandShoe: brandShoeId,
//       thumbnail,
//       status,
//       sizeShoe: sizeIds,
//       imageShoe: imageShoe,
//       colorShoe: colorIds,
//     });

//     const savedShoe = await shoe.save();
//     console.log('Shoe created successfully:', savedShoe);

//     res.status(201).json({ message: 'Shoe created successfully', data: savedShoe });

//   } catch (error) {
//     console.error('Error during shoe creation: ', error);
//     res.status(500).json({ message: 'Internal Server Error', error });
//   }
// };



exports.addShoe = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      brandShoeId,
      thumbnail,
      status,
      sizes,
      imageShoe,
      colorShoe
    } = req.body;

    let shoe = await Model.ShoeModel.findOne({ name });
    if (shoe) {
      return res.status(400).json({ message: 'Shoe already exists' });
    }

    const brand = await Model.TypeShoeModel.findById(brandShoeId);
    const shoeId = formatString(brand.nameType);

    // Tối ưu hóa việc lưu trữ kích cỡ và màu sắc
    const sizeDocs = await Model.SizeShoeModel.insertMany(sizes.map(size => ({
      size: size.size,
      isEnable: true,
      sizeId: formatString(size.size)
    })), { ordered: false });

    const colorDocs = await Model.ColorShoeModel.insertMany(colorShoe.map(color => ({
      textColor: color.textColor,
      codeColor: color.codeColor
    })), { ordered: false });

    const storageShoe = [];
    for (const colorDoc of colorDocs) {
      for (const sizeDoc of sizeDocs) {
        storageShoe.push({
          colorShoe: colorDoc._id,
          sizeShoe: sizeDoc._id,
          importQuantity: sizeDoc.quantity, 
          soldQuantity: 0,
          remainingQuantity: sizeDoc.quantity
        });
      }
    }

    shoe = new Model.ShoeModel({
      shoeId,
      name,
      price,
      description,
      brandShoe: brandShoeId,
      thumbnail,
      status,
      imageShoe: imageShoe,
      storageShoe: storageShoe
    });

    const savedShoe = await shoe.save();
    console.log('Shoe created successfully:', savedShoe);

    res.status(201).json({ message: 'Shoe created successfully', data: savedShoe });

  } catch (error) {
    console.error('Error during shoe creation: ', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};



exports.UpdateQualaty_Size = async (req, res) => {
  const { sizeId, quantityToBuy } = req.body; // Lấy thông tin từ body của request

  try {
    // Tìm kích cỡ giày bằng ID
    const sizeShoe = await Model.SizeShoeModel.findById(sizeId);
    if (!sizeShoe) {
      return res.status(404).json({ msg: "Kích cỡ giày không tồn tại hoặc không khả dụng." });
    }

    // Kiểm tra số lượng tồn kho
    if (sizeShoe.quanlity < quantityToBuy) {
      return res.status(400).json({ msg: "Không đủ số lượng sản phẩm." });
    }
    sizeShoe.oldquanlity = sizeShoe.quanlity; // Giữ nguyên giá trị quanlity
    sizeShoe.buyquanlity = (sizeShoe.buyquanlity || 0) + quantityToBuy;
    await sizeShoe.save();

    // Gửi phản hồi thành công
    res.status(200).json({
      msg: "Cập nhật số lượng thành công.",
      updatedSize: sizeShoe
    });
  } catch (error) {
    // Gửi phản hồi lỗi
    res.status(500).json({ msg: "Có lỗi xảy ra: " + error.message });
  }
};