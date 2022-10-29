import glob
import os
import shutil

files = glob.glob("*")
for f in files:
    if (f != "update.py" and len(f.split(".svelte")) == 2 and os.path.isfile(f) and f != "+layout.svelte"):
        if(os.path.isdir(f)):
            shutil.move(f, f + "/+page.svelte")
        else:
            os.mkdir(f.replace(".svelte", ""))
            shutil.move(f, f.replace(".svelte", "") + "/+page.svelte")
