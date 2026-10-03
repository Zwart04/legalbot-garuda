export const PRODUCTS = {
  "legalbot-garuda": {
    "accent": "#c38d69",
    "currency": "IDR",
    "tagline": "Your matters, thoughtfully organized.",
    "modules": [
      {
        "key": "clients",
        "label": "Klien",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "email",
            "label": "Email",
            "type": "email"
          },
          {
            "key": "phone",
            "label": "Nomor telepon",
            "type": "text"
          },
          {
            "key": "address",
            "label": "Alamat",
            "type": "textarea"
          }
        ],
        "statuses": [
          "active",
          "archived"
        ]
      },
      {
        "key": "matters",
        "label": "Perkara",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "client_id",
            "label": "Klien",
            "type": "ref",
            "ref": "clients",
            "required": true
          },
          {
            "key": "description",
            "label": "Deskripsi",
            "type": "textarea"
          },
          {
            "key": "reference",
            "label": "Nomor referensi",
            "type": "text"
          }
        ],
        "statuses": [
          "open",
          "in_progress",
          "closed"
        ]
      },
      {
        "key": "documents",
        "label": "Dokumen",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "matter_id",
            "label": "Perkara",
            "type": "ref",
            "ref": "matters",
            "required": true
          },
          {
            "key": "body",
            "label": "Isi dokumen",
            "type": "textarea",
            "required": true
          },
          {
            "key": "version_label",
            "label": "Label versi",
            "type": "text"
          }
        ],
        "statuses": [
          "active",
          "archived"
        ]
      },
      {
        "key": "deadlines",
        "label": "Tenggat",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "matter_id",
            "label": "Perkara",
            "type": "ref",
            "ref": "matters",
            "required": true
          },
          {
            "key": "date",
            "label": "Tanggal",
            "type": "date",
            "required": true
          },
          {
            "key": "notes",
            "label": "Catatan",
            "type": "textarea"
          }
        ],
        "statuses": [
          "pending",
          "done"
        ]
      },
      {
        "key": "tasks",
        "label": "Pekerjaan",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "matter_id",
            "label": "Perkara",
            "type": "ref",
            "ref": "matters",
            "required": false
          },
          {
            "key": "date",
            "label": "Tanggal",
            "type": "date",
            "required": true
          },
          {
            "key": "notes",
            "label": "Catatan",
            "type": "textarea"
          }
        ],
        "statuses": [
          "todo",
          "doing",
          "done"
        ]
      },
      {
        "key": "time_entries",
        "label": "Catatan waktu",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "matter_id",
            "label": "Perkara",
            "type": "ref",
            "ref": "matters",
            "required": true
          },
          {
            "key": "date",
            "label": "Tanggal",
            "type": "date",
            "required": true
          },
          {
            "key": "minutes",
            "label": "Menit",
            "type": "number",
            "min": 1
          },
          {
            "key": "rate",
            "label": "Tarif per jam",
            "type": "money"
          },
          {
            "key": "notes",
            "label": "Catatan",
            "type": "textarea"
          }
        ],
        "statuses": [
          "active",
          "archived"
        ]
      },
      {
        "key": "invoices",
        "label": "Invoice",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "client_id",
            "label": "Klien",
            "type": "ref",
            "ref": "clients",
            "required": true
          },
          {
            "key": "matter_id",
            "label": "Perkara",
            "type": "ref",
            "ref": "matters",
            "required": false
          },
          {
            "key": "amount",
            "label": "Jumlah",
            "type": "money"
          },
          {
            "key": "due_date",
            "label": "Jatuh tempo",
            "type": "date"
          }
        ],
        "statuses": [
          "unpaid",
          "paid",
          "void"
        ]
      },
      {
        "key": "clauses",
        "label": "Klausul & template",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "body",
            "label": "Isi klausul",
            "type": "textarea",
            "required": true
          },
          {
            "key": "tags",
            "label": "Tag",
            "type": "text"
          }
        ],
        "statuses": [
          "active",
          "archived"
        ]
      },
      {
        "key": "references",
        "label": "Referensi",
        "fields": [
          {
            "key": "name",
            "label": "Nama / judul",
            "type": "text",
            "required": true
          },
          {
            "key": "url",
            "label": "URL sumber",
            "type": "url"
          },
          {
            "key": "description",
            "label": "Catatan sumber",
            "type": "textarea"
          },
          {
            "key": "checked_at",
            "label": "Tanggal pemeriksaan",
            "type": "date"
          }
        ],
        "statuses": [
          "active",
          "archived"
        ]
      },
      {
        "key": "assistant",
        "label": "Asisten dokumen",
        "tool": "ai",
        "fields": []
      },
      {
        "key": "reports",
        "label": "Laporan",
        "tool": "reports",
        "fields": [],
        "statuses": []
      }
    ],
    "id": "legalbot-garuda",
    "name": "Garuda Legal Workspace",
    "purpose": "Manajemen perkara, dokumen, tenggat, waktu kerja dan referensi dalam satu workspace.",
    "sources": [
      "legalbot-garuda",
      "lawbot",
      "legalbotgaruda"
    ],
    "workflow": "Klien → perkara → dokumen & tenggat → pekerjaan/catatan waktu → invoice → arsip perkara; sumber referensi disimpan eksplisit."
  }
};
