<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/v1', 'PricelistController@index');

Route::get('/data', 'PricelistController@data_price');



Route::get('/tester', 'PricelistController@get_data_dev');

Route::get('/', 'PricelistController@get_data');


