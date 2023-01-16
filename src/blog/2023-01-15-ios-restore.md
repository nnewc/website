---
title: An iOS restore from any machine
date: 2023-01-15 20:47:18
excerpt: Here is a little bit about my post.
type: post
blog: true
tags:
    - iOS
    - cybersecurity
    - recovery
---
Its a well documented [hack]() that wiping an iOS device and restoring from backup can free up a large amount of storage. What you may not know is that to restore an iOS device, you dont need iTunes, a Mac, or iCloud. This post describes my experience recently where I wiped my device and thought I had lost everything.

I currently am still using an older iPhone and I am pretty happy with how it still performs flawlessly after 5+ years. Every year or so though, I have to perform the hack described above to reclaim storage left around from iOS's log files, caches and other temporary files that slowly eat up the entire device's storage. The wipe/restore process does not compromise any of your data (e.g. messages, photos, posts, etc.) or any apps which get re-downloaded after the device is restored with everything still intact.

As I begin to use Linux more and more in my daily life, I was curious if there were other iOS users who wanted ~~first-class~~ support in a Linux ecosystem. In 2020, I was able to install and run iTunes 12 to run on [Wine](https://www.winehq.org/) and make a backup and perform an iTunes sync successfully. Since then however, Apple has removed all Wine-compatible installers from their Downloads site and even patched later versions of iTunes to prevent Wine emulation from working. I also recently found [libimobiledevice](https://libimobiledevice.org/) which is a FOSS library and tools to allow you to communicate with iOS devices.

I installed the packages `libimobiledevice6` `libimobiledevice-utils` with my package manager and quickly figured out how to make a backup from the command-line utility. After the backup finished I went to my Mac laptop where I make my primary backups, and made another backup with the Finder app. My backups had previously been encrypted with a password and I figured I could recall it when I needed to restore. Oops. With the backups made I was ready to wipe my iPhone.

I tapped on the Settings app and went to `General` -> `Transfer or Reset iPhone` -> `Erase all Content and Settings` and wiped the device. At this point, the data on the iPhone is actually still intact on the device. iOS does not delete everything because deleting every file would be far too slow and needlessly wear down the memory cells on the device. Instead, iOS just deletes the encryption key used to decrypt the device's storage partition. With the encryption key deleted, the device's storage is completely inaccessible, but ready to be overwritten with new data.

Next, I confidently opened Finder to restore my back up data only to find my password was incorrect. Oh no!!! I tried a few times to enter the password and all failed. At this point, I was starting to panic and thought I had lost everything! After doing some googling, I found that iTunes gives user the option to store the backup on the MacOS keychain, so I opened the Keychain app and there was the key listed below:

The screenshot above shows iTunes saves the backup password as `iOS Backup` and they password can be accessed if you provide your MacOS login password. 

After retrieving my password from the MacOS keychain I pasted the password into the dialog box only to be met with the same error message that my password was incorrect. I was very concerned by now, and could no long contain my frustration, as my evening had been completely derailed. I unplugged my phone and sat down at a Linux machine to try to restore my backup.

After fiddling at the command line to restore my backup with `imobiledevice2`, the backup was not able to be restored, and I'm still not sure what went wrong. My password provided for this backup was a simple one like `mypw`, but `imobiledevice2` reported my password was incorrect. With the prospects very slim of recovering anything I started going through the iOS new device setup steps to restart my phone. I also [came across](https://medium.com/taptuit/breaking-into-encrypted-iphone-backups-4dacc39403f0) a blogger who restored a friends backup from a wordlist their friend provided of their possibly used passwords. The blogger fed the wordlist to a common password cracking tool [hashcat](https://hashcat.net/hashcat/). I made my own wordlist, but this time included the password I got from my keychain. `hashcat` promptly returned with `status: cracked`. Bingo!

My heart skipped a beat and I became even more puzzled. I thought for a few minutes, and then wrote the command to tell `imobiledevice2` to restore my backup, but this time used my keychain password. The screen was blank for a few seconds and then happily started restoring my backup! When the restore finished it then had to reinstall firmware and reboot. When the iPhone rebooted I finally knew it worked because all of my apps were back on the home screen.

It appears I was too clever and when I decided to encrypt my iOS backups with iTunes, I went to my password generator and selected the most impossibly hard password to crack: 50 alphanumeric characters, knowing (at the time) that I could retrieve it from my keychain by providing my login credentials. iTunes does not prompt the user for the password when making backups, only when restoring, and reuses the same password for all backups until disabled in the settings. I set the password in iTunes several years ago and made serveral restores. Finder has the same functionality, but it appears there is a bug since it did not take a correctly provided 50-character password.




