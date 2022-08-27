<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Mobil;


class Sewa extends Model
{
    use HasFactory;
    protected $table = 'sewa';
    protected $fillable = [
        'user_id',
        'mobil_id',
        'mobil_qty',
        'tgl_sewa',
    ];

    protected $with = ['mobil'];
    public function mobil()
    {
        return $this->belongsTo(Mobil::class, 'mobil_id', 'id' );
    }
}
