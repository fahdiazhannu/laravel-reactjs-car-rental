<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mobil extends Model
{
    use HasFactory;
    protected $table = 'mobils';
    protected $fillable = [
        'category_id',
        'meta_title',
        'slug',
        'meta_deskripsi',
        'meta_keyword',
        'nama',
        'deskripsi',
        'merk',
        'tahunmobil',
        'kapasitas',
        'hargasewa_disk',
        'hargasewa_asli',
        'qty',
        'image',
        'featured',
        'popular',
        'status',

    ];
    
    protected $with = ['category'];
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

}

