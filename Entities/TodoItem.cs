﻿using System;

namespace Entities
{
    public class TodoItem : BaseEntity
    {
        public string Text { get; set; }
        public bool Finished { get; set; }
    }
}