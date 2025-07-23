module.exports = (query) => {
    let objectSearch = {
        keyword: "",
    }
    if (query.keyword) {
        objectSearch.keyword = query.keyword
        const regex = new RegExp(objectSearch.keyword, 'i')//sử dụng regex để tìm kiếm tương đối tham số thứ 2 sẽ giúp ko phân biệt viết hoa viết thường
        objectSearch.regex = regex
    }
    return objectSearch;
}