<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCardAttachments extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('card_attachments', function(Blueprint $table)
		{
			$table->increments('id');
            $table->string('file_name', 255);
            $table->string('file_extension', 45);
            $table->string('file_location', 255);
            $table->boolean('attachment_type');
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('card_attachments');
	}

}
