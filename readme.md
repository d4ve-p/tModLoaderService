**Important Notes**

Currently only support linux. 

Tested on:

- Ubuntu Server 22.0.4
- Ubuntu Client 22.0.4

In linux environment, game save files are usually stored in `/home/[YOUR_USER_NAME]/.local/share/Terraria/tModLoader`. 

If you plan to use docker, change the volume to target that directory. By default, you need to create tmod_data folder in current directory to save your files.

**Steps to setup**
1. Download the latest tModLoader from their github into this directory.
2. Make `.env` file based on `.env.example`
3. do `npm install`
4. do `npm run dev`
