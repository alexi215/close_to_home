# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140805210952) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "crimes", force: true do |t|
    t.datetime "date"
    t.string   "address"
    t.string   "offense"
    t.string   "method"
    t.integer  "ward"
    t.float    "latitude"
    t.float    "longitude"
  end

  create_table "locations", force: true do |t|
    t.string  "label"
    t.string  "address",                            null: false
    t.integer "radius"
    t.decimal "latitude",  precision: 10, scale: 6
    t.decimal "longitude", precision: 10, scale: 6
    t.integer "user_id"
  end

  create_table "users", force: true do |t|
    t.string "email"
    t.string "password_digest"
    t.string "remember_token"
  end

end
