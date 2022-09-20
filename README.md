API DOCUMENTATION

Api Category

| Method  |      URL            | Description |
| ------- | -------------       |-------------|
| POST    | /api/store-category | Create Car Category |
| GET     | /api/view-category  | Get Car Category |
| PUT     | /api/update-category/{id}| Update Car Category by ID |
| DELETE  | /api/delete-category/{id}| Delete Car by ID |

Api Car

| Method  |      URL            | Description |
| ------- | -------------       |-------------|
| POST    | /api/store-car | Create Car |
| GET     | /api/view-mobil  | Get All Car  |
| GET     | /api/fetchmobil/{slug} | Get Car by Slug |
| GET     | /api/mobildetail/{category_slug}/{mobil_slug} | Get Car by Category Slug and Car Slug |
| GET     | /api/edit-mobil/{id}| Edit Car by ID |
| PUT     | /api/update-mobil/{id}| Update Car by ID |
| DELETE  | /api/delete-mobil/{id}| Delete Car by ID |

Api Transaction

| Method  |      URL            | Description |
| ------- | -------------       |-------------|
| POST    | /api/sewa-mobil | Transaction Car |
| GET     | /api/detail-sewa  | Get Detail of Transaction  |
| UPDATE     | /api/sewa-update/{sewa_id}/{scope}}| Update Transaction Duration by Id Transaction |
| DELETE     | /api/delete-sewaitem/{sewa_id}|Delete Transaction by Id Transaction |
| POST  | /api/place-order| Place Order/Checkout |
