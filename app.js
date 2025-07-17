const express = require("express");
const cors = require("cors");

const contactsRouter = require("./app/routes/contact.route");

const ApiError = require("./app/api-error");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) =>{
    res.json({message: "Welcome to contact book application."});
});

app.use("/api/contacts", contactsRouter);


// handle 404 response
app.use((req, res, next) => {
    // Code chạy khi không có route được định nghĩa nào khớp request 
    // gọi next() để chuyển sang middleware xử lý lỗi 
    return next(new ApiError(404, "Resource not found"));
});


// define error-handling middleware last, after other app.use() and routes calls
app.use((error, req, res, next) => {
    // midlleware xử lý lỗi tập trung 
    // trong các đoạn xử lý  ở các route, gọi next(error) sẽ chuyển về middleware xử lý lỗi này
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});


module.exports = app;
