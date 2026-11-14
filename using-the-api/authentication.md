# Authentication

Send your API key as a bearer token on every `/v1/` request:

```http
Authorization: Bearer pt_...
```

* Keys start with `pt_` and are issued by the PodTorrent team.
* We store only a hash of your key, so we can't show it to you again. If you
  lose it, ask for a new one.
* A key can have limits on requests per minute and tokens per day. See
  [Errors and limits](errors-and-limits.md#quotas).

A missing, unknown or disabled key gets a `401` with type
`authentication_error`.

{% hint style="warning" %}
Treat the key like a password. Keep it on your server and out of browser or
mobile app code.
{% endhint %}
