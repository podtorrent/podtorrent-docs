# Run without a screen (headless)

For a machine nobody sits at: a Mac mini, a Linux box or a Jetson you reach over
SSH. PodTorrent runs as a background service and you drive it with the
`podtorrent` command. It's the same peer as the
[PodTorrent app](podtorrent-app.md), without the window.

Two commands, about 10 minutes plus the model download.

## What you need

| Machine | Needs |
| --- | --- |
| macOS | Apple silicon, macOS 14 or newer, 16 GB memory, about 2 GB free disk |
| Linux, AMD Ryzen AI Max | Kernel 6.14 or newer, your user in the `video` and `render` groups, about 25 GB free disk |
| NVIDIA Jetson AGX Orin | JetPack 6 or 7, your user in the `video` and `render` groups, about 10 GB free disk |

Plus room for the model layers you serve (often 10–60 GB), and a
[node id and token](../getting-started/node-quickstart.md#first-get-a-node-id-and-token)
to join the network. Setup checks all of this and prints the fix for anything missing.

## 1. Install

```bash
curl -fsSL https://podtorrent.com/install.sh | sh -s -- --headless
```

Over SSH you can leave out `--headless`: the installer picks it by itself. It
ends with `PodTorrent is installed. Next:`.

{% hint style="info" %}
`podtorrent: command not found`? Add it to your PATH, then try again:
`echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zprofile && source ~/.zprofile`
(on Linux, `~/.profile`).
{% endhint %}

## 2. Set up

```bash
podtorrent setup
```

It opens with a box showing the PodTorrent version and this machine, then walks
five steps. Press Enter at any question to accept the suggestion in
`[brackets]`.

| Step | What happens | You do | If it stalls or fails |
| --- | --- | --- | --- |
| **1 Check** | `ok` / `warn` for each check | Nothing | `warn` is fine. A `FAIL` prints its fix: do it, run `podtorrent setup` again. |
| **2 Install** | Python and MLX on macOS (about 1 GB); PyTorch for the GPU on Linux (up to 25 GB) | Wait | Slow, not stuck. If the download drops, run setup again. |
| **3 Name** | `name other peers see [my-machine]` | Enter, or type a name | — |
| **4 Start** | Installs and starts the background service | Nothing | Up to a minute is normal. If it gives up, it shows the log; run `podtorrent doctor`. |
| **5 Model** | A ranked list of models, then a suggested layer range | Enter twice | `✗` means it won't fit: pick another. Low on disk? Type a smaller range, like `0:8`. |
| **Join** | `join the PodTorrent network…? [y/N]` | `y`, then your node id and token (hidden as you type) | No node id yet? Press Enter and run `podtorrent join` later. |

Step 5 looks like this (your models and numbers will differ):

```text
   model           layers  peers  status
 1. owner/model-a       64      3  missing 40–63
 2. owner/model-b       36      2  one copy only

Which model? … [1]
  suggested: layers 40–63 (24 of 64, about 6.8 GB)
  Press Enter to accept, or type a range like 0:24: [40:64]
  downloading [##############          ]  58%
Serving layers 40–63 of owner/model-a.
```

The list puts what the network needs most first: `missing …` layers, then
models with `one copy only`.

Interrupted anywhere? Run `podtorrent setup` again: it picks up where it
stopped and keeps what's done.

## 3. Check it

```bash
podtorrent top
```

A live view of this machine and the network (Ctrl-C quits). For the web
dashboard, forward its port from your own computer and open
`http://127.0.0.1:27183`:

```bash
ssh -L 27183:127.0.0.1:27183 you@the-machine
```

## 4. Keep it running after reboots

{% tabs %}
{% tab title="macOS" %}
```bash
# start at boot with nobody logged in (asks your password once)
podtorrent install-service --at-boot
# power back on after a power cut
sudo pmset -a autorestart 1
```

With FileVault on, the Mac waits to be unlocked after a restart. Restart it
with `sudo fdesetup authrestart`, which unlocks once by itself.
{% endtab %}
{% tab title="Linux and Jetson" %}
```bash
# keep running after you log out, and start at boot
sudo loginctl enable-linger $USER
```
{% endtab %}
{% endtabs %}

## Day to day

| To | Run |
| --- | --- |
| See what it's doing | `podtorrent top` |
| Read the logs | `tail -f ~/.podtorrent/service.log` (macOS), `journalctl --user -u podtorrent -f` (Linux) |
| Serve more layers | `podtorrent setup` |
| Join or leave the network | `podtorrent join` / `podtorrent leave` |
| Update | Run the install command again. Models and settings stay. |

## If something goes wrong

```bash
podtorrent doctor
```

It checks everything, says what's wrong, and writes one file to send to
support, with your node token and keys removed.

| Problem | Fix |
| --- | --- |
| Port 27183 already in use | The PodTorrent app is running on this machine too. Quit it: they share the port. |
| Nothing running after a reboot | See [step 4](#_4-keep-it-running-after-reboots). |
| Setup stopped part way | Run `podtorrent setup` again. |

## Remove it

```bash
podtorrent uninstall-service
rm -rf ~/.local/share/podtorrent ~/.local/bin/podtorrent
```

Models and settings stay in `~/.podtorrent`. Delete that folder too to start
from zero.
